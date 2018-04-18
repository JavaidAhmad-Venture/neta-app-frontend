
export interface ContactInfo{
            email: string,
            facebook: string,
            phone: number,
            twitter:string,
            website:string

            };


export interface Info{
        age:number,
        assets:string,
        caste:string,
        cover_photo:null//further will be used
        criminal_cases:string,
        dob:string,
        education:{
                created_at:string,
                id:string,
                name:string,
                updated_at:string,
        }
        gender:string,
        income:string,
        liabilities:string,
        name:string,
        pincode:string,
        profession:string,
        profile_pic:{
            cloudinary:{
                public_id:string,
            },
        },
        religion:string,
        label: {
            name: string,     //mla/mp
            color: string     //badge color
        }
    
};


export interface PartySupportInfo{
    candidate_vote_count:number,
    candidature:{
        candidate_name:string,
        candidature_id:string,
        constituency_id:string,
        constituency_name:string,
    },
    party_name:string,
    party_profile_pic:{
        cloudinary:{
            public_id:string,
        }
    },
    supported_user_info:{},
    vote_percentage:string,
};
export interface Profile{
    contact_info:ContactInfo,
    info:Info,
    id:string,
    party_and_support_info:PartySupportInfo,


}



export interface LeaderHistroy{
constituency:string,
election:string,
id:string,
party:string,
party_abbreviation:string,
result:string,
year:number,
}