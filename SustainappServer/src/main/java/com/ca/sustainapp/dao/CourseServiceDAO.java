package com.ca.sustainapp.dao;

import static org.apache.commons.codec.binary.Base64.encodeBase64String;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import com.ca.sustainapp.criteria.CourseCriteria;
import com.ca.sustainapp.entities.CourseEntity;
import com.ca.sustainapp.pojo.SearchResult;
import com.ca.sustainapp.repositories.CourseRepository;
import com.ca.sustainapp.specification.CourseSpecification;

/**
 * data access object service
 * @author Anas Neumann <anas.neumann.isamm@gmail.com>
 * @since 25/01/2107
 * @verion 1.0
 */
@Service("courseService")
public class CourseServiceDAO extends GenericServiceDAO {

	/**
	 * Le repository
	 */
	@Autowired
	CourseRepository repository;
	
	/**
	 * Accès un seul entity par son Id
	 * @param id
	 * @return
	 */
	public CourseEntity getById(Long id){
		if(null == id){
			return null;
		}
		CourseEntity entity = repository.findOne(id);
		return entity.setBase64(encodeBase64String(entity.getPicture()));
	}
	
	/**
	 * Create a new entity
	 * @param entity
	 * @return
	 */
	@Modifying
	@Transactional
	public Long createOrUpdate(CourseEntity entity){
		return repository.saveAndFlush(entity).getId();
	}
	
	/**
	 * Delete an entity by Id
	 * @param id
	 */
	@Modifying
	@Transactional
	public void delete(Long id){
		Integer nb = repository.countById(id);
		if (0 < nb) {
			repository.delete(id);
		}
	}
	
	/**
	 * get All
	 * @return
	 */
	@Transactional
	public List<CourseEntity> getAll(){
		List<CourseEntity> listResult = repository.findAll();
		for(CourseEntity entity : listResult){
			entity.setBase64(encodeBase64String(entity.getPicture()));
		}
		return listResult;
	}

	/**
	 * search by criteria
	 * @param criteria
	 * @param startIndex
	 * @param maxResults
	 * @return
	 */
	@Transactional
	public SearchResult<CourseEntity> searchByCriteres(CourseCriteria criteria, Long startIndex, Long maxResults) {		
		Specification<CourseEntity> spec = CourseSpecification.searchByCriteres(criteria);
		PageRequest paginator = new PageRequest(startIndex.intValue(), maxResults.intValue());
		Page<CourseEntity> page = repository.findAll(spec, paginator);
		
		SearchResult<CourseEntity> result = initSearchResult(startIndex, maxResults);
		result.setTotalResults(page.getTotalElements()).setResults(page.getContent());
		for(CourseEntity entity : result.getResults()){
			entity.setBase64(encodeBase64String(entity.getPicture()));
		}
		return result;
	}
}
