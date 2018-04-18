export interface TopParty{
    id: string,
    party_name: string,
    votes: number,
    percentage: number,
    party_abbreviation: string,
    party_color: string,
    image: {
        cloudinary: {
            public_id: string
        }
    }     
}