package com.specup.mongeul.domain.friends.repository;

import com.specup.mongeul.domain.friends.entity.Friend;
import com.specup.mongeul.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Long> {
    boolean existsByUserAndFriend(User user, User friend);

    @Query("SELECT f FROM Friend f WHERE f.user.id = :userId OR f.friend.id = :userId")
    List<Friend> findByUserIdOrFriendId(@Param("userId") Long userId);

    @Modifying
    @Query("UPDATE Friend f SET f.status = :status WHERE f.id = :id")
    void updateStatus(@Param("id") Long id, @Param("status") Short status);

    @Query("SELECT f FROM Friend f WHERE (f.user = :user AND f.friend.id = :friendId) OR (f.friend = :user AND f.user.id = :friendId)")
    Optional<Friend> findFriendRelationship(@Param("user") User user, @Param("friendId") Long friendId);
}