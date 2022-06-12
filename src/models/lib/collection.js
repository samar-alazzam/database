class Collection{
    constructor(model){
        this.model = model;

    }
    async create(obj){
        try{
            let newRecord = await this.model.create(obj);
            return newRecord;
        }
        catch(e){
            console.error("error in creating a new record in model " , this.model);

        }
    }
    async read(data_id){
        try{
            let record = null;
            if (data_id){
                record = await this.model.findOne({where:{id : data_id}});
                return record;
            }
            else{
                record = await this.model.findAll();
                return record;
            }

        }
        catch(e){
            console.error("error in reading a record in model" , this.model);

        }
    }
    async update(obj){
        try{
            //let record= await this.model.findOne({where:{id : data_id}});
            let updated = await record.update(obj);

        }catch(e){
            console.error("error in updating record in model" , this.model);
        }
    }
    async delete(data_id){
        if(!data_id){
            throw new Error('on id provided for model' , this.model);
        }else{
            try{
                let deleted = await this.model.destroy({where:{id : data_id}});
            }
            catch(e){
                console.error('error in deleting record in model', this.model);
            }
        }
    }
}
module.exports= Collection;