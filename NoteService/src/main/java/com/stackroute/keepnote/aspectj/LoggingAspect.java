package com.stackroute.keepnote.aspectj;

import java.util.Arrays;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/* Annotate this class with @Aspect and @Component */

@Aspect
@Component
public class LoggingAspect {
	/*
	 * Write loggers for each of the methods of Note controller, any particular method
	 * will have all the four aspectJ annotation
	 * (@Before, @After, @AfterReturning, @AfterThrowing).
	 */
	
	private static final Logger log = LoggerFactory.getLogger(LoggingAspect.class);

	@Before("within(com.stackroute.keepnote.controller.*)")
	public void logBeforeGetNote(JoinPoint joinpoint) {
		log.info("====================@Before==========================");
		log.debug("Method Name:" + joinpoint.getSignature().getName());
		log.debug("****************************************************");

	}

	@After("execution(* com.stackroute.keepnote.controller.*.*(..))")
	public void logAfterGetNote(JoinPoint joinpoint) {
		log.info("====================@After==========================");
		log.debug("Method Name:" + joinpoint.getSignature().getName());
		log.debug("Method Arguments: " + Arrays.toString(joinpoint.getArgs()));
		log.debug("****************************************************");

	}
	
	@AfterReturning(pointcut="execution(* com.stackroute.keepnote.controller.*.*(..))",returning="result")
	public void logAfterReturningGetNote(JoinPoint joinpoint,Object result) {
		log.info("====================@AfterReturning==========================");
		log.debug("Method Name:" + joinpoint.getSignature().getName());
		log.debug("Method Arguments: " + Arrays.toString(joinpoint.getArgs()));
		log.debug("****************************************************");

	}
	
	@AfterThrowing(pointcut="execution(* com.stackroute.keepnote.controller.NoteController.*(..))",throwing="error")
	public void logAfterThrowingGetNote(JoinPoint joinpoint,Throwable error) {
		log.info("====================@AfterThrowing==========================");
		log.debug("Method Name:" + joinpoint.getSignature().getName());
		log.debug("Method Arguments: " + Arrays.toString(joinpoint.getArgs()));
		log.debug("Exception: "+error);
		log.debug("****************************************************");

	}
}
