package com.Fitness_Quees.fitness.Repository;

import com.Fitness_Quees.fitness.Entity.Routine;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;

@Repository
public interface RoutineRepository extends JpaRepository<Routine, Long> {
    Optional<Routine> findByDate(Date date);


    // RoutineRepository.java
    @Modifying
    @Transactional
    @Query("DELETE FROM Routine r WHERE r.date = :date")
    void deleteByDate(@Param("date") Date date);

}
