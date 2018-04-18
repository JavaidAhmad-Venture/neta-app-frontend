import { PopularCandidate } from "./popularCandidate";
import { PopularInfluencer } from "./popularInfluencer";
import { TopParty } from "./topParties";

export interface PopularPeople{
    data: {
        parliament_constituency_id: string,
        popular_candidates:PopularCandidate[],
        popular_influencers:PopularInfluencer[],
        top_parties: TopParty[],
        top_parties_pc: TopParty[],
    },
    status_code: number
}