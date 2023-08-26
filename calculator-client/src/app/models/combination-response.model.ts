import { Combination } from "./combination.model";

export interface CombinationResponse {
    equal?: Combination;
    floor?: Combination;
    ceil?: Combination;
}