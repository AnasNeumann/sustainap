package com.ca.sustainapp.controllers;

import java.util.GregorianCalendar;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ca.sustainapp.boot.SustainappConstantes;
import com.ca.sustainapp.entities.ProfileEntity;
import com.ca.sustainapp.responses.HttpRESTfullResponse;
import com.ca.sustainapp.responses.SessionResponse;
import com.ca.sustainapp.utils.StringsUtils;
import com.ca.sustainapp.validators.SigninValidator;

/**
 * Restfull controller for session management
 * @author Anas Neumann <anas.neumann.isamm@gmail.com>
 * @since 08/02/2017
 * @version 1.0
 */
@CrossOrigin
@RestController
public class SessionController extends GenericController {

	/**
	 * Injection de dépendances
	 */
	@Autowired
	private SigninValidator signinValidator;

	/**
	 * create a new account
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/signin", method = RequestMethod.POST, produces = SustainappConstantes.MIME_JSON)
    public String singin(HttpServletRequest request) {
		SessionResponse response = new SessionResponse();
		response.setErrors(signinValidator.validate(request));
		if(null != response.getErrors() && response.getErrors().size() > 0){
			response.setCode(0);
			return response.buildJson();
		}
		ProfileEntity profile = new ProfileEntity()
				.setMail(request.getParameter("mail"))
				.setPassword(StringsUtils.md5Hash(request.getParameter("mail")))
				.setFirstName(request.getParameter("firstName"))
				.setLastName(request.getParameter("lastName"))
				.setTimestamps(GregorianCalendar.getInstance())
				.setIsAdmin(false);
		response.setCode(1);
		profile.setId(profilService.createOrUpdate(profile));
		super.reloadSession(request, profile.getId());
		return response.setProfile(profile).buildJson();
    }

	/**
	 * login a session
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/login", method = RequestMethod.POST, produces = SustainappConstantes.MIME_JSON)
    public String login(HttpServletRequest request) {
		return null;
    }

	/**
	 * logout a session
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/logout", method = RequestMethod.POST, produces = SustainappConstantes.MIME_JSON)
    public String logout(HttpServletRequest request) {
		request.getSession().invalidate();
		return new HttpRESTfullResponse().setCode(1).buildJson();
    }

	/**
	 * get a session
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/session", method = RequestMethod.GET, produces = SustainappConstantes.MIME_JSON)
    public String verifySession(HttpServletRequest request) {
		SessionResponse response = new SessionResponse();
		if(super.isConnected(request)){
			response.setCode(1);
			response.setProfile(super.getSession(request));
		} else {
			response.setCode(0);
		}
		return response.buildJson();
    }

}