import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import { useAccount } from "wagmi";
import Link from "next/link";

const Home: NextPage = () => (
	<div>
    	<Head>
        	<title>StackUp x Arbitrum Forum App</title>
        	<meta
            	content="Generated by @rainbow-me/create-rainbowkit"
            	name="description"
        	/>
        	<link href="/favicon.ico" rel="icon" />
    	</Head>

    	<main className='bg-gray-600'>
        	<h1 className=''>
            	Welcome to <span className=''>StackUp</span> x{" "}
            	<span className=''>Arbitrum</span> Forums
        	</h1>
        	<ConnectButton label="Sign In" />
        	<br />
        	<p className=''>
            	{useAccount().isConnected && (
                	<>
                    	You are connected. Head to our{" "}
                    	<Link className='' href="/forum">
                        	Forum
                    	</Link>{" "}
                    	now!
                	</>
            	)}
        	</p>
    	</main>

    	<footer className=''>
        	<p>
            	Step into Arbitrum campaign, brought to you by{" "}
            	<a href="https://stackup.dev" target="_blank" rel="noreferrer">
                	StackUp
            	</a>{" "}
            	❤️ in partnership with{" "}
            	<a href="https://arbitrum.io" rel="noreferrer" target="_blank">
                	Arbitrum!
            	</a>{" "}
            	💙🧡
        	</p>
    	</footer>
	</div>
);

export default Home;
