import { assign, createMachine } from "xstate";

type MachineContext = {
  celsius: string;
  fahrenheit: string;
};

type MachineEvents =
  | {
      type: "CHANGE_CELSIUS";
      value: string;
    }
  | {
      type: "CHANGE_FAHRENHEIT";
      value: string;
    };

type MachineStates = { value: "ready"; context: MachineContext };

const format = (val: number) =>
  (Math.round((val + Number.EPSILON) * 100) / 100).toString();

export const stateMachine = createMachine<
  MachineContext,
  MachineEvents,
  MachineStates
>({
  predictableActionArguments: true,
  initial: "ready",
  context: {
    celsius: "0",
    fahrenheit: "0",
  },
  states: {
    ready: {
      on: {
        CHANGE_CELSIUS: {
          actions: assign((_context, { value }) => {
            return {
              celsius: value,
              fahrenheit: value.length
                ? format(parseInt(value, 10) * (9 / 5) + 32)
                : "",
            };
          }),
        },
        CHANGE_FAHRENHEIT: {
          actions: assign((_context, { value }) => {
            return {
              fahrenheit: value,
              celsius: value.length
                ? format((parseInt(value, 10) - 32) * (5 / 9))
                : "",
            };
          }),
        },
      },
    },
  },
});
