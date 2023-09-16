"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const piston_1 = require("./piston");
(async () => {
    const pistonInstance = await (0, piston_1.piston)("http://localhost:2000");
    console.log(pistonInstance.configuration);
    console.log(await pistonInstance.getRuntimes());
    console.log(await pistonInstance.executeSourceCode("r = input()\nprint('Hello ' + r)", "python", "Bosica"));
})();
