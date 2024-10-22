// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {CanvasTrans} from "../src/CanvasTrans.sol";

contract CounterScript is Script {
    CanvasTrans public canvasTrans;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        canvasTrans = new CanvasTrans();

        vm.stopBroadcast();
    }
}
