export interface PopularCandidate{
                candidature_id: string,
                candidate_id: string,
                candidate_name: string,
                declared_candidate: boolean,
                party_abbreviation: string,
                party: {
                    name: string,
                    image: {
                        cloudinary: {
                            public_id: string,        }
                    },
                    abbreviation: string
                },
                candidate_profile_pic :{
                    cloudinary:{
                        public_id:string,
                    }
                },
                party_image: {
                    cloudinary: {
                        public_id: string,    }
                },
                votes: number,
                percentage: number,
                is_party_leader: boolean,
                is_voted_by_me: boolean,
                candidature_constituency_id: string,
                has_cover: boolean,
                label: '',
                constituency_name: string
            }