import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";
import * as s from "../../styles/globalStyles";
import styled from "styled-components";
import i1 from "../../assets/images/hidden.gif";
import newbanner from "../../assets/images/logo.png"
import "./Main.css";

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledImg = styled.img`
  width: 200px;
  height: 200px;
  @media (min-width: 767px) {
    width: 350px;
    height: 350px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

function Main() {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [feedback, setFeedback] = useState("");
    const [claimingNft, setClaimingNft] = useState(false);
    const claimNFTs = (_amount) => {
        _amount = document.getElementById("inputBox").value;
        if (_amount <= 0) {
            return;
        }
        setFeedback("Minting your Official BooCrew NFT...");
        setClaimingNft(true);
        blockchain.smartContract.methods
            .mint(blockchain.account, _amount)
            // ********
            // You can change the line above to
            // .whiteListMint(blockchain.account, _amount) if you want only whitelisted
            // users to be able to mint through your website!
            // And after you're done with whitelisted users buying from your website,
            // You can switch it back to .mint(blockchain.account, _amount).
            // ********
            .send({
                gasLimit: 285000 * _amount,
                to: "0x8815e06FC5b57Bd4d5590977a697582f19d2330e", // the address of your contract
                from: blockchain.account,
                value: blockchain.web3.utils.toWei((0.035 * _amount).toString(), "ether"),
            })
            .once("error", (err) => {
                console.log(err);
                setFeedback("Sorry, something went wrong. Check your transaction on Etherscan to find out what happened!");
                setClaimingNft(false);
            })
            .then((receipt) => {
                setFeedback(
                    "Your BooCrew NFT has been successfully minted!"
                );
                setClaimingNft(false);
                dispatch(fetchData(blockchain.account));
            });
    };

    const getData = () => {
        if (blockchain.account !== "" && blockchain.smartContract !== null) {
            dispatch(fetchData(blockchain.account));
        }
    };

    useEffect(() => {
        getData();
    }, [blockchain.account]);

    return (
        <div style={{ backgroundColor: "var(--black)", fontSize: 40 }}>
            <div style={{ padding: 24}}>
                <ResponsiveWrapper flex={1} style={{ padding: 24, paddingTop: 0 }}>
                    <s.Container flex={1} jc={"center"} ai={"center"} style={{ paddingTop: 0, flexDirection: "column" }}>
                        <s.TextTitle
                            style={{
                                textAlign: "center", fontSize: 80, fontWeight: "bold", borderStyle: "solid", borderColor: "black",
                                borderWidth: 0,
                                paddingLeft: 100,
                                paddingRight: 100,
                                borderRadius: 0,
                                marginTop: 0,
                                marginBottom: 0
                            }}
                        >
                            {blockchain.account == null ? "????" : (data.totalSupply)}/5555
                        </s.TextTitle>
                        <s.Container
                            flex={1}
                            jc={"center"}
                            ai={"center"}
                            style={{
                                padding: 0,
                                paddingTop: 0,
                                borderStyle: "solid",
                                borderColor: "black",
                                borderWidth: 0,
                                borderRadius: 30,
                                fontSize: 40
                            }}
                        >
                            {Number(data.totalSupply) === 5555 ? (
                                <>
                                    <s.TextTitle style={{ textAlign: "center" }}>
                                        The sale has ended.
                                    </s.TextTitle>
                                    <s.SpacerSmall />
                                    <s.TextDescription style={{ textAlign: "center" }}>
                                        Dont worry, you're not missing out! You can still get Boo Crew NFTs on{" "}
                                        <a
                                            // target={"_blank"}
                                            href={"https://testnets.opensea.io/collection/rinkeby-doodlenauts"}
                                        >
                                            Opensea.io
                                        </a>
                                    </s.TextDescription>
                                </>
                            ) : (
                                <>
                                    <s.TextDescription style={{ textAlign: "center", fontSize: 40 }}>
                                        {feedback}
                                    </s.TextDescription>
                                    {blockchain.account === "" ||
                                        blockchain.smartContract === null ? (
                                        <s.Container ai={"center"} jc={"center"}>
                                            <s.TextDescription style={{ textAlign: "center", fontSize: 80, marginBottom: 0 }}>
                                                Connect to the Boo Crew NFT Minter!
                                            </s.TextDescription>
                                            <s.SpacerSmall />
                                            <button
                                                className="connect-btn"
                                                style={{ fontFamily: "coder" }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    dispatch(connect());
                                                    getData();
                                                }}
                                            >
                                                CONNECT
                                            </button>
                                            <s.SpacerLarge />
                                            {blockchain.errorMsg !== "" ? (
                                                <>
                                                    <s.SpacerSmall />
                                                    <s.TextDescription style={{ textAlign: "center", fontSize: 50 }}>
                                                        {blockchain.errorMsg}
                                                    </s.TextDescription>
                                                </>
                                            ) : null}
                                        </s.Container>
                                    ) : (
                                        <s.Container ai={"center"} jc={"center"} fd={"row"} style={{ marginTop: 0, paddingTop: 0 }}>
                                            <form>
                                                I want <input
                                                    id="inputBox"
                                                    placeholder="#"
                                                    type="number"
                                                    min="1"
                                                    max="100"
                                                    style={{
                                                        fontSize: 60,
                                                        textAlign: "center",
                                                        backgroundColor: "#FFA537",
                                                        borderWidth: 4,
                                                        borderColor: "black",
                                                        borderStyle: "solid",
                                                        borderRadius: 40,
                                                        paddingRight: 10,
                                                        width: 80,
                                                        fontFamily: "coder",
                                                    }}
                                                /> Ghosts
                                            </form>
                                            <s.SpacerSmall />
                                            <div
                                                className="connect-btn"
                                                disabled={claimingNft ? 1 : 0}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    claimNFTs(1);
                                                    getData();
                                                }}
                                            >
                                                {claimingNft ? "BUSY" : "MINT"}
                                            </div>
                                        </s.Container>
                                    )}
                                </>
                            )}
                        </s.Container>
                    </s.Container>
                </ResponsiveWrapper>
                <s.SpacerSmall />
            </div>
        </div>
    );
}

export default Main;