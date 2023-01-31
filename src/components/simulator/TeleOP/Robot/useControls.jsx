import { useEffect, useState } from "react";


export const useControls = (vehicleAPI, chassisAPI) => {
    const viteza = 600;
    const turnViteza = 680;
    // const breke = 20;

    const multi = 1.8;

    let [controls, setControls] = useState({});

    // const brake = () => {
    //     vehicleAPI.setBrake(breke, 2);
    //     vehicleAPI.setBrake(breke, 3);
    //     vehicleAPI.setBrake(breke, 0);
    //     vehicleAPI.setBrake(breke, 1);
    // };

    // const stopBrake = () => {
    //     vehicleAPI.setBrake(0, 2);
    //     vehicleAPI.setBrake(0, 3);
    //     vehicleAPI.setBrake(0, 0);
    //     vehicleAPI.setBrake(0, 1);
    // };


    useEffect(() => {

        const keyDown = (e) => {
            setControls((controls) => ({
                ...controls,
                [e.key.toLowerCase()]: true
            }));
        }

        const keyUp = (e) => {
            setControls((controls) => ({
                ...controls,
                [e.key.toLowerCase()]: false
            }));
        }

        window.addEventListener("keydown", keyDown);
        window.addEventListener("keyup", keyUp);
        return () => {
            window.removeEventListener("keydown", keyDown);
            window.removeEventListener("keyup", keyUp);
        };

    }, []);

    useEffect(() => {

        const bagaViteza = (speed) => {
            vehicleAPI.applyEngineForce(speed, 0);
            vehicleAPI.applyEngineForce(speed, 1);
            vehicleAPI.applyEngineForce(speed, 2);
            vehicleAPI.applyEngineForce(speed, 3);
        };

        if (!vehicleAPI || !chassisAPI) return;

        if ((controls.w || controls.s) && (controls.a || controls.d)) {
            // stopBrake();
            if (controls.w)
                bagaViteza(turnViteza);
            else if (controls.s)
                bagaViteza(-turnViteza);
        }
        else if (controls.w) {
            // stopBrake();
            bagaViteza(viteza);
        } else if (controls.s) {
            // stopBrake();
            bagaViteza(-viteza);
        } else {
            bagaViteza(0);
            // brake();
        }

        if (controls.a) {
            vehicleAPI.setSteeringValue(0.35 * multi, 2);
            vehicleAPI.setSteeringValue(0.35 * multi, 3);
            vehicleAPI.setSteeringValue(-0.1 * multi, 0);
            vehicleAPI.setSteeringValue(-0.1 * multi, 1);
        } else if (controls.d) {
            vehicleAPI.setSteeringValue(-0.35 * multi, 2);
            vehicleAPI.setSteeringValue(-0.35 * multi, 3);
            vehicleAPI.setSteeringValue(0.1 * multi, 0);
            vehicleAPI.setSteeringValue(0.1 * multi, 1);
        } else {
            for (let i = 0; i < 4; i++) {
                vehicleAPI.setSteeringValue(0, i);
            }
        }


        if (controls.q) {
            vehicleAPI.setSteeringValue(Math.PI / 2, 2);
            vehicleAPI.setSteeringValue(Math.PI / 2, 3);
            vehicleAPI.setSteeringValue(Math.PI / 2, 0);
            vehicleAPI.setSteeringValue(Math.PI / 2, 1);
            bagaViteza(viteza)
        } else if (controls.e) 
        {
            vehicleAPI.setSteeringValue(Math.PI / 2, 2);
            vehicleAPI.setSteeringValue(Math.PI / 2, 3);
            vehicleAPI.setSteeringValue(Math.PI / 2, 0);
            vehicleAPI.setSteeringValue(Math.PI / 2, 1);
            bagaViteza(-viteza)

        }

        if (controls.r) {
            chassisAPI.position.set(22.5, 5, 38);
            chassisAPI.velocity.set(0, 0, 0);
            chassisAPI.angularVelocity.set(0, 0, 0);
            chassisAPI.rotation.set(0, 0, 0);
        }
    }, [controls, vehicleAPI, chassisAPI]);

    return controls;

};