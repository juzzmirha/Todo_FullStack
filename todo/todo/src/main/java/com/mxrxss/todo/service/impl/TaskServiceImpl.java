package com.mxrxss.todo.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mxrxss.todo.exception.TaskNotFoundException;
import com.mxrxss.todo.model.dto.TaskDto;
import com.mxrxss.todo.model.entity.Task;
import com.mxrxss.todo.model.entity.User;
import com.mxrxss.todo.repository.TaskRepository;
import com.mxrxss.todo.repository.UserRepository;
import com.mxrxss.todo.service.TaskService;
import jakarta.transaction.TransactionScoped;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Transactional
public class TaskServiceImpl implements TaskService {

    UserRepository userRepository;
    TaskRepository taskRepository;
    ObjectMapper mapper;

    @Override
    public List<TaskDto> findAll() {
        User user = fetchCurrentUser();
        List<Task> tasks = taskRepository.findAllByUserId(user.getUserId());
        return tasks
                .stream().map(task -> mapper.convertValue(task, TaskDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public TaskDto getById(long taskId) {
        User user = fetchCurrentUser();
        Task task = taskRepository.findByUserAndTask(user.getUserId(), taskId)
                .orElseThrow(() -> new TaskNotFoundException(taskId));

        return mapper.convertValue(task, TaskDto.class);
    }

    @Override
    public void addTask(TaskDto taskDto) {
        taskDto.setCreatedAt(LocalDateTime.now());
        Task task = mapper.convertValue(taskDto, Task.class);

        User user = fetchCurrentUser();
        task.setUser(user);

        taskRepository.save(task);
    }

    @Override
    public void updateTask(long taskId, TaskDto taskDto) {
        User user = fetchCurrentUser();
        Task task = taskRepository.findByUserAndTask(user.getUserId(), taskId)
                .orElseThrow(() -> new TaskNotFoundException(taskId));

        taskDto.setCreatedAt(task.getCreatedAt());

        task.setTaskId(taskId);
        task.setTitle(taskDto.getTitle());
        taskRepository.save(task);
    }

    @Override
    public void deleteTask(long taskId) {
        User user = fetchCurrentUser();
        taskRepository.findByUserAndTask(user.getUserId(), taskId)
                .orElseThrow(() -> new TaskNotFoundException(taskId));

        taskRepository.deleteById(taskId);
    }

    private User fetchCurrentUser(){
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }


}
