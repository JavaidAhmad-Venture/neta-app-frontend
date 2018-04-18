export interface PopularInfluencer{
    influencer_id: string,
    influencer_name: string,
    score: number,
    rank: number,
    constituency: string,
    influencer_profile_pic: {
        cloudinary: {
            public_id: string
        }
    },
    constituency_id: string,
    has_cover: boolean,
    cover_image: ''
}