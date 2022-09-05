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

//document.getElementById("connect").onclick=connect;
document.getElementById("converter").onclick = convertUSD;
