import { ethers } from "ethers";

export const handleSendEther = async (etherAmount, etherAddress) => {
  const amount = (etherAmount * 0.00001).toString();

  try {
    // Set up the provider using MetaMask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    // Retrieve the connected wallet address
    const signer = provider.getSigner();
    const senderAddress = await signer.getAddress();

    // Define the transaction
    const transaction = {
      to: etherAddress, // Replace this with the receiver's Ethereum address
      value: ethers.utils.parseEther(amount), // Convert the amount from Ether to Wei
    };

    // Send the transaction
    const tx = await signer.sendTransaction(transaction);
    // console.log("Transaction sent:", tx.hash);

    const txReceipt = await provider.waitForTransaction(tx.hash);
    console.log(txReceipt);
  } catch (error) {
    console.error("Error sending Ether:", error);
  }
};
