package com.specup.mongeul.domain.user.repository;

import com.specup.mongeul.domain.user.entity.LockPassword;
import com.specup.mongeul.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LockPasswordRepository extends JpaRepository<LockPassword, Long> {
    Optional<LockPassword> findByUser(User user);
}
