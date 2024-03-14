const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";
const leaf = "Sidney Kertzmann";
async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  const merkletree = new MerkleTree(niceList);
  const index = niceList.indexOf(leaf);
  const merkleProof = merkletree.getProof(index);

  console.log(merkleProof);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    merkleProof,
    leaf,
  });

  console.log({ gift });
}

main();
