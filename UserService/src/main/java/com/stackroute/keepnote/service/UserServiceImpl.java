package com.stackroute.keepnote.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.stackroute.keepnote.exceptions.UserAlreadyExistsException;
import com.stackroute.keepnote.exceptions.UserNotFoundException;
import com.stackroute.keepnote.model.User;
import com.stackroute.keepnote.repository.UserRepository;

/*
* Service classes are used here to implement additional business logic/validation 
* This class has to be annotated with @Service annotation.
* @Service - It is a specialization of the component annotation. It doesn't currently 
* provide any additional behavior over the @Component annotation, but it's a good idea 
* to use @Service over @Component in service-layer classes because it specifies intent 
* better. Additionally, tool support and additional behavior might rely on it in the 
* future.
* */
@Service
public class UserServiceImpl implements UserService {

	/*
	 * Autowiring should be implemented for the UserRepository. (Use
	 * Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword.
	 */

	/*
	 * This method should be used to save a new user.Call the corresponding method
	 * of Respository interface.
	 */

	private UserRepository userRepository;

	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public User registerUser(User user) throws UserAlreadyExistsException {

		user = userRepository.insert(user);

		if (Optional.ofNullable(user).isPresent()) {
			return user;
		} else
			throw new UserAlreadyExistsException("UserAlreadyExistsException");

	}

	/*
	 * This method should be used to update a existing user.Call the corresponding
	 * method of Respository interface.
	 */

	public User updateUser(String userId, User user) throws UserNotFoundException {

		User users = getUserById(userId);
		if (users.getUserId() == user.getUserId()) {
			userRepository.save(user);
		}
		return user;
	}

	/*
	 * This method should be used to delete an existing user. Call the corresponding
	 * method of Respository interface.
	 */

	public boolean deleteUser(String userId) throws UserNotFoundException {

		boolean flag = false;
		User user = getUserById(userId);
		if (user != null) {
			userRepository.delete(user);
			flag = true;

		} else {
			flag = false;
		}

		return flag;
	}

	/*
	 * This method should be used to get a user by userId.Call the corresponding
	 * method of Respository interface.
	 */

	public User getUserById(String userId) throws UserNotFoundException {

		Optional<User> user1 = userRepository.findById(userId);
		User user = user1.get();
		return user;
	}

}
