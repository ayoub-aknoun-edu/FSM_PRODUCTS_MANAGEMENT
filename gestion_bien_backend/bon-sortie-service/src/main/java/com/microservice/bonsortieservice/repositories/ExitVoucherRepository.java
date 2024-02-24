package com.microservice.bonsortieservice.repositories;

import com.microservice.bonsortieservice.entities.ExitVoucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExitVoucherRepository extends JpaRepository<ExitVoucher,Long> {
    List<ExitVoucher> findByChecked(boolean is_checked);
}
