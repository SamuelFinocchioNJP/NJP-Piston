import { piston } from './piston';

(async () => {
    const pistonInstance = await piston("http://localhost:2000");

    console.log(pistonInstance.configuration);
    console.log(await pistonInstance.getRuntimes());
    console.log(await pistonInstance.executeSourceCode("r = input()\nprint('Hello ' + r)", "python", "Bosica"));
})();
