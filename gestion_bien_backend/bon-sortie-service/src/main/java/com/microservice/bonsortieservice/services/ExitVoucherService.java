package com.microservice.bonsortieservice.services;

import com.microservice.bonsortieservice.clients.ProductClient;
import com.microservice.bonsortieservice.entities.ExitVoucher;
import com.microservice.bonsortieservice.entities.ExitedProduct;
import com.microservice.bonsortieservice.repositories.ExitVoucherRepository;
import com.microservice.bonsortieservice.repositories.ExitedProductRepository;

import org.apache.http.HttpResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ExitVoucherService {
    private final ProductClient productClient;
    private final ExitVoucherRepository exitVoucherRepository;
    private final ExitedProductRepository exitedProductRepository;
    public ExitVoucherService(ProductClient productClient, ExitVoucherRepository exitVoucherRepository, ExitedProductRepository exitedProductRepository) {
        this.productClient = productClient;
        this.exitVoucherRepository = exitVoucherRepository;
        this.exitedProductRepository = exitedProductRepository;
    }

    public List<ExitVoucher> getAllExitVouchers() {
        return exitVoucherRepository.findAll();
    }

    public String addExitVoucher(ExitVoucher exitVoucher,Authentication authentication){
        //LinkedHashMap<String,?> ex =  (LinkedHashMap<String,?>)productClient.getBsProduct(exitVoucher.getExitedProduct().getTag(), exitVoucher.getExitedProduct().getReference(), exitVoucher.getExitedProduct().getQuantity()).getBody();
        Collection<String> roles = authentication(authentication);
        List<ExitedProduct> exitedProductList = new ArrayList<>();
        if (exitVoucher.getExitedProduct() == null) {
            return "No product to exit";
        }else {
            for (ExitedProduct e : exitVoucher.getExitedProduct()) {
                LinkedHashMap<String, ?> ex = (LinkedHashMap<String, ?>) productClient.getBsProduct(e.getTag(), e.getReference(), e.getQuantity()).getBody();
                if (ex != null) {
                    ExitedProduct exitedProduct = new ExitedProduct();

                    if (ex.containsKey("reference")) {
                        exitedProduct.setReference((String) ex.get("reference"));
                    }

                    if (ex.containsKey("quantity")) {
                        exitedProduct.setQuantity((Integer) ex.get("quantity"));
                    }

                    if (ex.containsKey("tag")) {
                        LinkedHashMap<String, ?> tag = (LinkedHashMap<String, String>) ex.get("tag");
                        if (tag.containsKey("name")) {
                            exitedProduct.setTag((String)tag.get("name"));
                        }
                        if (tag.containsKey("superTag")) {
                            LinkedHashMap<String,String> superTag = (LinkedHashMap<String, String>) tag.get("superTag");
                            if (superTag.containsKey("name")) {
                                exitedProduct.setSuperTag(superTag.get("name"));
                            }
                        }
                    }

                    if (ex.containsKey("name")) {
                        exitedProduct.setName((String) ex.get("name"));
                    }
                    exitedProductList.add(exitedProductRepository.save(exitedProduct));
                }
            }
            ExitVoucher ev = ExitVoucher.builder()
                    .user_name(exitVoucher.getUser_name())
                    .date(exitVoucher.getDate())
                    .approved(roles.contains("ADMIN"))
                    .checked(roles.contains("ADMIN"))
                    .exitedProduct(exitedProductList)
                    .build();

            exitVoucherRepository.save(ev);
            return "Exit voucher added successfully";
        }
    }

    // get roles of the user from authentication
 public Collection<String> authentication(Authentication authentication){
    Collection<String> roles = new ArrayList<>();
    authentication.getAuthorities().forEach(authority -> roles.add(authority.getAuthority()));
    return roles;
    }

    public ResponseEntity<String> approveExitVoucher(Long exv_number) {
        ExitVoucher exitVoucher = exitVoucherRepository.findById(exv_number).get();
        exitVoucher.setChecked(true);
        exitVoucher.setApproved(true);
        exitVoucherRepository.save(exitVoucher);

        return ResponseEntity.ok("Exit voucher approved !! " + exv_number);
    }

    public ResponseEntity<String> declineExitVoucher(Long exv_number) {
        ExitVoucher exitVoucher = exitVoucherRepository.findById(exv_number).get();
        exitVoucher.setChecked(true);
        exitVoucher.setApproved(false);
        for (ExitedProduct exitedProduct: exitVoucher.getExitedProduct()){
            productClient.setBsProductReturn(exitedProduct.getTag(),exitedProduct.getReference(),exitedProduct.getQuantity());
        }
        exitVoucherRepository.save(exitVoucher);
        return ResponseEntity.ok("Exit voucher declined !! " + exv_number);
    }

    public List<ExitVoucher> getAllUncheckedExitVouchers() {
        return exitVoucherRepository.findByChecked(false);
    }
}
