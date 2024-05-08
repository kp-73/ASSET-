const Web3 = require('web3');


let web3Instance;

// Check if Web3 is already defined (for example, by MetaMask)
if (typeof web3 !== 'undefined') {
  // Use the existing web3 provider
  web3Instance = new Web3(web3.currentProvider);
} else {
  // Fallback to a Web3 provider you control (e.g., Ganache)
  web3Instance = new Web3(new Web3.providers.HttpProvider("http://localhost:7545")); // Update with your provider URL
}

// Now you can use web3Instance for your Web3 operations


// Instantiate your smart contract
const contractAddress = '0x50BAeeEe7E395a53661cE57c92C70d6E46F43f0c';
const contractAbi = [
  [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_initialSupply",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "assetId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "AssetRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "assetOwners",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
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
      "type": "function",
      "constant": true
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
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_assetId",
          "type": "uint256"
        }
      ],
      "name": "registerAsset",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_assetId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "transferAsset",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
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
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
];

//const contractInstance = new web3.eth.Contract(contractAbi, contractAddress);





// Add event listener for file upload form submission
document.getElementById("uploadForm").addEventListener("submit", uploadFile);


// Function to handle file upload form submission
async function uploadFile(event) {
 
  var song = document.getElementById("songInput").value;
  var artist = document.getElementById("artistInput").value;
  var year = document.getElementById("yearInput").value;
  var file = document.getElementById("fileInput").files[0];

  if (file) {
    // Create FormData object to send file and metadata
    var formData = new FormData();
    formData.append("song", song);
    formData.append("artist", artist);
    formData.append("year", year);
    formData.append("mp3File", file);

    // Send POST request to PHP script
    try {
      const response = await fetch('upload.php', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.text();
        console.log(data); // Log response from PHP script
        alert("File uploaded");
      } else {
        console.error('Error:', response.statusText);
        alert("File not uploaded");
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network error here
    }
  } else {
    alert("Please select an MP3 file to upload.");
  }
} 

// Add event listener for file upload form submission
document.getElementById("uploadForm").addEventListener("submit", uploadFile);


// Function to tokenize the uploaded file
async function tokenizeFile(fileMetadata) {
  try {
    // Trigger tokenization function in your smart contract
    const accounts = await web3.eth.getAccounts();
    await contractInstance.methods.tokenizeFile(fileMetadata).send({ from: accounts[0] });

    // Handle successful tokenization
    console.log('File tokenized successfully!');
    // Update UI or show success message to the user
  } catch (error) {
    // Handle errors
    console.error('Error tokenizing file:', error);
    // Show error message to the user
  }
}

// Add event listener for file upload form submission
document.getElementById("uploadForm").addEventListener("submit", uploadFile);
function toggleForm() {
  var formBox = document.getElementById("formBox");
  var assetInfo = document.getElementById("assetInfo");
  
  if (formBox.style.display === "none") {
    formBox.style.display = "block";
    assetInfo.style.display = "none";
  } else {
    formBox.style.display = "none";
    assetInfo.style.display = "flex";
  }
}

function showSignupForm() {
  var loginForm = document.getElementById("loginForm");
  var signupForm = document.getElementById("signupForm");

  loginForm.style.display = "none";
  signupForm.style.display = "block";
}

function showTokenizeForm() {
  var tokenizeForm = document.getElementById("tokenizeForm");
  var assetInfo = document.getElementById("assetInfo");

  tokenizeForm.style.display = "block";
  assetInfo.style.display = "none";
}

function showTokenizeNowForm() {
  var tokenizeForm = document.getElementById("tokenizeForm");
  var assetInfo = document.getElementById("assetInfo");

  assetInfo.style.display = "none";
  tokenizeForm.style.display = "block";
}
