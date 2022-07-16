import Follow from '../model/follow.js';
export const updateFollow=async(request,response)=>{
    try {
        const follow=await Follow.findById(request.params.id);
        if(!follow){
            return response.status(404).json({msg:'follow not found'});
        }
        await Follow.findByIdAndUpdate(request.params.id,{$set:request.body}) //$set,#addtoset

        return response.status(200).json({msg:'follow updated successfully'});
    } catch (error) {
        return response.status(500).json({error:error.message});
    }
}

export const getFollow=async(request,response)=>{
    try{
        const follow=await Follow.findOne({email:request.params.id});
        console.log(follow);
        return response.status(200).json(follow);
    }
    catch(error){
        return response.status(500).json({msg:error.message});
    }
}