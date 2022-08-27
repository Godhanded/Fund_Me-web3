const main= async()=>{
  [owner, burner]=await hre.ethers.getSigners();
  const fundmefactory= await hre.ethers.getContractFactory("FundMeFactory");
  console.log(fundmefactory)
  const FundFactory= await fundmefactory.deploy();
  await FundFactory.deployed();

  console.log("contract deployed at: ", FundFactory.address);
  console.log("Owner is: ",owner.address);

  let test= await FundFactory.generateFundMe(owner.address,hre.ethers.utils.parseEther("5"),"test")
  let receipt= await test.wait();
  let Event= receipt.events.find(event=>event.event==="newContract");
  [_name, address]=Event.args;
  console.log("name: ",_name,"address: ",address);

}

const runMain= async()=>{
  try {
    await main();
    process.exit(0);
  }catch (error){
    console.log(error);
    process.exit(1);
  }
}
runMain();