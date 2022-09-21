const serverUrl = "https://sndlrv1wsl5d.usemoralis.com:2053/server";
const appId = "5uPH0OxHOWu6BAyuPBa3NrovyTICvbM4TpSRnHKL";

Moralis.start({
  serverUrl,
  appId,
});

const check = () => {
  if (!window.ethereum)
    alert("Sorry a browser wallet is required before you can use this service");
};

async function connect() 
{
  let user = await Moralis.User.current();

  if (!user) {
    user = await Moralis.authenticate({
      signingMessage: "Please connect and sign wallet to get access",
    });
    await Moralis.enableWeb3();
    const ethAddress = user.get("ethAddress"),
      topText = ethAddress.slice(0, 5),
      bottomText = ethAddress.slice(-4);
    document.getElementById(
      "connect"
    ).textContent = `${topText}...${bottomText}`;
  } else {
    await Moralis.User.logOut();
    document.getElementById("connect").textContent = "connect";
  }
}

async function convertUSD() 
{
  await Moralis.enableWeb3();
  let amount = document.getElementById("amount").value;
  let option = {
    contractAddress: "0x9A45928dfD2c612137F0EC5E2164A9284534113d",
    functionName: "getLatestPrice",
    abi: factoryAbi,
    params: {
      _amountUSD: amount,
    },
  };

  let result = await Moralis.executeFunction(option);
  console.log(result.toString());
  document.getElementById("amount").value = (result / 10 ** 18).toString();
}

async function generateContract() 
{
  let owner = document.getElementById("owner").value;
  let amount = document.getElementById("amount").value;
  let newAmount = Moralis.Units.ETH(amount);
  let name = document.getElementById("name").value;
  await Moralis.enableWeb3();
  document.getElementById("genAddress").innerHTML = `Loading...`;
  let option = {
    contractAddress: "0x9A45928dfD2c612137F0EC5E2164A9284534113d",
    functionName: "generateFundMe",
    abi: factoryAbi,
    params: {
      _owner: owner,
      _amount: newAmount,
      _name: name,
    },
  };

  let result = await Moralis.executeFunction(option);
  let receipt = await result.wait();
  let Event = receipt.events;
  [_name, address] = Event[0].args;

  document.getElementById(
    "genAddress"
  ).innerHTML = `Generated Contract, Enabling...`;
  let option2 = {
    contractAddress: address,
    functionName: "startFunding",
    abi: fundAbi,
  };
  let tx = await Moralis.executeFunction(option2);
  await tx.wait();

  document.getElementById(
    "genAddress"
  ).innerHTML = `Contract Enabled, Uploading Meta data to IPFS `;

  const image = await uploadImage();

  const ipfsLink = await uploadMeta(image, owner, amount, name, address);
  const fundingInfo = Moralis.Object.extend("fundingInfo");
  const fundCreated = new fundingInfo();
  fundCreated.save({
    owner: owner,
    projectName: name,
    ipfsHash: ipfsLink,
  });

  document.getElementById(
    "genAddress"
  ).innerHTML = `${_name}, generated and enabled at: ${address} ; ipfs Link: ${ipfsLink}`;
}

async function viewInfo() 
{
  await Moralis.enableWeb3();
  let address = document.getElementById("detail").value;
  Abi = fundAbi;
  let option1 = {
    contractAddress: address,
    functionName: "getBalance",
    abi: Abi,
    // params: {
    // },
  };

  let balance = await Moralis.executeFunction(option1);

  let option2 = {
    contractAddress: address,
    functionName: "getAmountNeeded",
    abi: Abi,
  };

  let expected = await Moralis.executeFunction(option2);

  let option3 = {
    contractAddress: address,
    functionName: "getFunders",
    abi: Abi,
  };

  let funders = await Moralis.executeFunction(option3);

  result = `
  <h3>amount received: <span>${Moralis.Units.FromWei(balance.toString())}</span></h3><br>
  <h3>amount expecting: <span>${Moralis.Units.FromWei(expected.toString())}</span></h3><br>
  <h3>your funders: <span>${funders}</span></h3><br>
  `;

  document.getElementById("result").innerHTML = result;
}

async function withdraw() 
{
  let contract = document.getElementById("withdrawAddr").value;
  let amount = document.getElementById("withdrawAmount").value;

  await Moralis.enableWeb3();

  let option2 = {
    contractAddress: contract,
    functionName: "endFunding",
    abi: fundAbi,
  };

  let option = {
    contractAddress: contract,
    functionName: "pullFunds",
    abi: fundAbi,
    params: {
      _amount: Moralis.Units.ETH(amount),
    },
  };

  await Moralis.executeFunction(option2);
  document.getElementById("withdrawResult").innerHTML =
    "Disabled funding, Now Withdrawing...";
  await Moralis.executeFunction(option);
  const html = `
  <head>
    <title>Withdraw Success</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="./css/withdraw-confirm.css">
</head>

<body>
    <div>
        <img src="../images/Thumbs Up.png" alt="">
    </div>

    <h3>congrats</h3>

    <div>
        <p>
            Your <span>withdraw</span> was sucessful, your fundraiser funds has been deposited to your wallet address
        </p>
    </div>

    <div class="buttons">
        <button>share</button>
        <a href="../index.htm">end</a>
    </div></body>`;
  document.getElementById("withdrawResult").innerHTML = "Completed";
  document.getElementById("withdraw-section").innerHTML = html;
}

async function uploadImage() 
{
  const data = fileInput.files[0];
  const file = new Moralis.File(data.name, data);
  await file.saveIPFS();

  return file.ipfs();
}

async function uploadMeta(image, owner, amount, name, contract) 
{
  const fName = document.getElementById("fName").value;
  const lName = document.getElementById("lName").value;
  const desc = document.getElementById("details").value;
  const duration = document.getElementById("duration").value;
  const extraInfo = document.getElementById("additionalInfo").value;

  const metaData = {
    "Creator Name": fName + " " + lName,
    "Project Name": name,
    Image: image,
    "Project Details": desc,
    "Additional details": extraInfo,
    "Funding Amount": amount,
    "Project Owner": owner,
    "Project Duration": duration,
    "Contract Address": contract,
  };
  const file = new Moralis.File("file.json", {
    base64: btoa(JSON.stringify(metaData)),
  });
  await file.saveIPFS();

  return file.ipfs();
}

async function getFundings() 
{
  const name = document.getElementById("search").value;
  const fundingInfo = Moralis.Object.extend("fundingInfo");
  const fundQuery = new Moralis.Query("fundingInfo");
  const result = await fundQuery.find("projectName", name);
  const { projectName, ipfsHash, owner } = result[0].attributes;
  document.getElementById("mIframe").style.display = "block";
  document.getElementById("mIframe").src = ipfsHash;
}
check();
