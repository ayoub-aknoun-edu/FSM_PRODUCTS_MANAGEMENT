package com.microservice.bonsortieservice.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder
public class ExitVoucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long exv_number;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;
    private String user_name;
    private Boolean checked;
    private Boolean approved;
    @ManyToMany
    @JoinTable(
            name = "exited_product_exit_voucher",
            joinColumns = @JoinColumn(name = "exit_voucher_id"),
            inverseJoinColumns = @JoinColumn(name = "exited_product_id"))
    private List<ExitedProduct> exitedProduct;
}
