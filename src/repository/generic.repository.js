const postgres = require('../models');
class GenericRepo {
   constructor() {
      if (GenericRepo.instance) {
        return GenericRepo.instance;
      }
      this.data = Math.random(); // Example property
      GenericRepo.instance = this;
   }

   setOptions(model, {selectOptions, condition, paginateOptions, transaction, inclussions, data, array}) {
      console.log(model, {selectOptions, condition, paginateOptions, transaction, inclussions, data, array})
      this.query = {selectOptions, condition, paginateOptions, transaction, inclussions, data, array};
      this.dbQuery = postgres.models[model]
      return this
   }

   create = () =>{
      const {data, transaction} = this.query
      return this.dbQuery.create( data, {...(transaction && {transaction})});
   }

   bulkCreate = () =>{
      const {array, transaction} = this.query
      return this.dbQuery.bulkCreate( array, {...(transaction && {transaction})});
   }

   update = () =>{
      const {changes, condition, transaction, returning} = this.query
      return this.dbQuery.update(
        changes,
        {
           where: condition,
           returning,
           ...(transaction && {transaction})
        }
      )
   }

   _delete = async()=>{
      const {condition, transaction} = this.query
      return this.dbQuery.destroy({
         where: condition,
         ...(transaction && {transaction})
      })
   }

   findAll = () =>{
      const {selectOptions, condition, transaction, inclussions} = this.query
     return this.dbQuery.findAll(
        {
           where: condition,
           attributes: selectOptions,
           include: inclussions
        }
     )
   }

   findAllWithPagination = async() =>{
      const {selectOptions, condition, paginateOptions, inclussions} = this.query
     const findAndCount = await this.dbQuery.findAndCountAll(
        {
           ...paginateOptions,
           where: condition,
           attributes: selectOptions,
           include: inclussions
        }
     )
     return findAndCount
   }

   findOne = () =>{
      const {selectOptions, condition, paginateOptions, transaction, inclussions} = this.query
      return this.dbQuery.findOne(
        {
           where: condition,
           attributes: selectOptions,
           include: inclussions
        }
     )
   }
 }
 
 module.exports = GenericRepo;