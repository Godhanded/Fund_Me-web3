const serverUrl = "https://sndlrv1wsl5d.usemoralis.com:2053/server";
const appId = "5uPH0OxHOWu6BAyuPBa3NrovyTICvbM4TpSRnHKL";

Moralis.start({
  serverUrl,
  appId,
});

async function connect() {
  let user = await Moralis.User.current();

  if (!user) {
    user = await Moralis.authenticate({
      signingMessage: "Please connect and sign wallet to get access",
    });
    await Moralis.enableWeb3();
    document.getElementById("connect").textContent = user.get("ethAddress");
  } else {
    await Moralis.User.logOut();
    document.getElementById("connect").textContent = "connect";
  }
}

async function convertUSD() {
  await Moralis.enableWeb3();
  let amount = document.getElementById("amount").value;
  let option = {
    contractAddress: "0xCc8C505fEc49cCE710C6f2F6f1C383d401a2eAF4",
    functionName: "getLatestPrice",
    abi: [
      {
        inputs: [
          { internalType: "uint256", name: "_amountUSD", type: "uint256" },
        ],
        name: "getLatestPrice",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
    ],
    params: {
      _amountUSD: amount,
    },
  };

  let result = await Moralis.executeFunction(option);
  console.log(result.toString());
  document.getElementById("amount").value = result.toString();
}

async function generateContract() {
  let owner = document.getElementById("owner").value;
  let amount = document.getElementById("amount").value;
  let name = document.getElementById("name").value;
  await Moralis.enableWeb3();
  let option = {
    contractAddress: "0xCc8C505fEc49cCE710C6f2F6f1C383d401a2eAF4",
    functionName: "generateFundMe",
    abi: [
      {
        inputs: [
          { internalType: "address", name: "_owner", type: "address" },
          { internalType: "uint256", name: "_amount", type: "uint256" },
          { internalType: "string", name: "_name", type: "string" },
        ],
        name: "generateFundMe",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    params: {
      _owner: owner,
      _amount: amount,
      _name: name
    },
  };

  let result = await Moralis.executeFunction(option);
  let receipt= await result.wait();
  // let Event= receipt.events.find(event=>event.event==="newContract");
  // console.log(Event);
  // [_name, address]=Event.args;
  // console.log("name: ",_name,"address: ",address);

  
  // document.getElementById("genAddress").innerHTML=Event
}

async function viewInfo(){
  await Moralis.enableWeb3();
  let address= document.getElementById("detail").value;
  Abi=[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "failed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "invalidState",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "notFactory",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "notOwner",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "amountNeeded",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "balance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "endFunding",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAmountNeeded",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getFunders",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "funder",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "internalType": "struct goFundMe.funders[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "initializer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "pullFunds",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "startFunding",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "state",
      "outputs": [
        {
          "internalType": "enum goFundMe.State",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalReceived",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]
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
    // params: {
    // },
  };

  let expected = await Moralis.executeFunction(option2);

  let option3 = {
    contractAddress: address,
    functionName: "getFunders",
    abi: Abi,
    // params: {
    // },
  };

  let funders = await Moralis.executeFunction(option3);

  result=`
  <h3>amount received: <span>${balance}</span></h3><br>
  <h3>amount expecting: <span>${expected}</span></h3><br>
  <h3>your funders: <span>${funders}</span></h3><br>
  `;

  document.getElementById("result").innerHTML= result;

}