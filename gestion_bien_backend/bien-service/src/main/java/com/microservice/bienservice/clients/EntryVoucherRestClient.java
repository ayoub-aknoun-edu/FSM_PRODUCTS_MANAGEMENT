package com.microservice.bienservice.clients;

import com.microservice.bienservice.models.EntryVoucher;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Date;

@FeignClient(name = "ENTRY-VOUCHER-SERVICE")
public interface EntryVoucherRestClient {
   @GetMapping("/entryVoucher/{ev}")
   @CircuitBreaker(name="entryVoucher-service", fallbackMethod = "getDefaultEntryVoucher")
   EntryVoucher getEntryVoucherByEV(@PathVariable long ev);

   default EntryVoucher getDefaultEntryVoucher(long ev, Exception e){
      EntryVoucher entryVoucher = new EntryVoucher();
        entryVoucher.setEvNumber(ev);
        entryVoucher.setDate(new Date() );
        entryVoucher.setDescription("Not vailable for the moment");
        return entryVoucher;
   }
}
