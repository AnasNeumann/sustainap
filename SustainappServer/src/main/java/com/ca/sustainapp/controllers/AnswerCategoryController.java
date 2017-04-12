package com.ca.sustainapp.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ca.sustainapp.boot.SustainappConstantes;
import com.ca.sustainapp.validators.AnswerValidator;

/**
 * Restfull controller for answer's categories management
 * @author Anas Neumann <anas.neumann.isamm@gmail.com>
 * @since 12/04/2017
 * @version 1.0
 */
@CrossOrigin
@RestController
public class AnswerCategoryController extends GenericCourseController {

	/**
	 * Injection de dépendances
	 */
	@Autowired
	AnswerValidator validator;
	
	/**
	 * create a new category
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/category", method = RequestMethod.POST, produces = SustainappConstantes.MIME_JSON)
    public String create(HttpServletRequest request) {
		return null;
	}
	
	/**
	 * delete a category by id
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/category/delete", method = RequestMethod.POST, produces = SustainappConstantes.MIME_JSON)
    public String delete(HttpServletRequest request) {
		return null;
	}
	
	/**
	 * drag & drop a category
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/category/drop", method = RequestMethod.POST, produces = SustainappConstantes.MIME_JSON)
    public String drop(HttpServletRequest request) {
		return null;
	}
}