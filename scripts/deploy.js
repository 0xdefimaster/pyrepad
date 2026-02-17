const hre = require("hardhat");

async function main() {
  console.log("Deploying PyrePad contracts to Monad...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Deploy Factory
  console.log("\n🏭 Deploying PyrePadFactory...");
  const PyrePadFactory = await hre.ethers.getContractFactory("PyrePadFactory");
  const factory = await PyrePadFactory.deploy();
  await factory.waitForDeployment(); // v6'da deployed() yerine waitForDeployment()

  const factoryAddress = await factory.getAddress(); // v6'da .address yerine getAddress()
  console.log("✅ PyrePadFactory deployed to:", factoryAddress);

  // Save deployment info
  const fs = require("fs");
  const deploymentInfo = {
    network: hre.network.name,
    factory: factoryAddress,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
  };

  fs.writeFileSync("./deployments.json", JSON.stringify(deploymentInfo, null, 2));
  console.log("\n📝 Deployment info saved to deployments.json");
  console.log("\n🎉 Deployment complete!");
  console.log("Factory:", factoryAddress);
  console.log("Update CONTRACTS.FACTORY in web3.js with this address");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });