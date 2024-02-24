package com.microservice.bonentreeservice.repositories;

import com.microservice.bonentreeservice.entities.EntryVoucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EntryVoucherRepository extends JpaRepository<EntryVoucher,Long> {

    Optional<EntryVoucher> findByEvNumber(long evNumber);
}
