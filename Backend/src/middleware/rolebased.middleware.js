const access=(...roles)=>{
  return (req,res,next)=>{
    const userRole=req.role;
    const hasCommonRole = roles.includes(userRole);
    if(hasCommonRole){
      console.log("access granted");
      next();
    }else{
      res.status(403).json({error:"Access forbidden"});
    }
  }
}

module.exports={access}