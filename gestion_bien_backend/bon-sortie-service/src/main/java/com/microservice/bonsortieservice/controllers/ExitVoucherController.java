package com.microservice.bonsortieservice.controllers;

import com.microservice.bonsortieservice.entities.ExitVoucher;
import com.microservice.bonsortieservice.services.ExitVoucherService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/exit-voucher")
public class ExitVoucherController {
    private final ExitVoucherService exitVoucherService;

    public ExitVoucherController(ExitVoucherService exitVoucherService) {
        this.exitVoucherService = exitVoucherService;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping
    public List<ExitVoucher> getAllExitVouchers() {
        return exitVoucherService.getAllExitVouchers();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/unchecked")
    public List<ExitVoucher> getAllUncheckedExitVouchers() {
        return exitVoucherService.getAllUncheckedExitVouchers();
    }

    @PostMapping
    public String addExitVoucher(@RequestBody ExitVoucher exitVoucher,Authentication authentication){
        return exitVoucherService.addExitVoucher(exitVoucher,authentication);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/approve/{exv_number}")
    public ResponseEntity<String> approvedExitVoucher(@PathVariable Long exv_number){
        return exitVoucherService.approveExitVoucher(exv_number);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/reject/{exv_number}")
    public ResponseEntity<String> rejectExitVoucher(@PathVariable Long exv_number){
        return exitVoucherService.declineExitVoucher(exv_number);
    }

    @GetMapping("/mysession")
    public Collection<String> authentication(Authentication authentication) {
        return exitVoucherService.authentication(authentication);
    }
    @GetMapping("/auth")
    public Authentication getAuth(Authentication authentication) {
        return authentication;
    }

}
