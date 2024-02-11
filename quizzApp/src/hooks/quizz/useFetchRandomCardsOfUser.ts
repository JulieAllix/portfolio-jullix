import {useSelector} from "react-redux";

import {State} from "@Utils/redux/store";
import {useFetchLanguageToLearn} from "@Hooks/useFetchLanguageToLearn";
import {CardData} from "@Models/types/bases/quizzApp/Form";
import {getRandomNumberId, studyCardsRef} from "@Utils/firebaseConfig";

export const useFetchRandomCardsOfUser = () => {
    // Idée : modifier le typage de Form pour retirer languageUid, et modifier le typage de Language pour ajouter studyCardUids (string[]).
    // A faire après le rapatriement de la BDD car va nécessiter une migration

    const user = useSelector((state: State) => state.user);
    const {languageToLearnData} = useFetchLanguageToLearn();

    const fetchRandomCardsOfUser = async (numberOfQuestionsToPick: number) => {
        const uniqueRandomUids = new Set();

        while (uniqueRandomUids.size < numberOfQuestionsToPick) {
            uniqueRandomUids.add(getRandomNumberId());
        }

        const randomUidsArray = Array.from(uniqueRandomUids);
        console.log("randomUidsArray", randomUidsArray)

        const cardsDataArrayPromises = randomUidsArray.map((randomUid) =>
            studyCardsRef
                .where("userUid", "==", user.userUid)
                .where("languageUid", "==", languageToLearnData.languageUid)
                .orderBy("cardUid")
                .startAt(randomUid)
                .limit(1)
                .get()
        );

        const cardsDataArray = await Promise.all(cardsDataArrayPromises);

        const cardsData = cardsDataArray.map((querySnapshot) => {
            const document = querySnapshot.docs[0];
            return document ? document.data() : null;
        });

        return Promise.all(cardsData).then(response => {
            const _cardsDataArray = response.map((cardData: CardData) => {
                if (cardData !== undefined) {
                    return cardData
                } else return null
            });
            return _cardsDataArray.filter(data => data !== null);
        })
    };

    return {
        fetchRandomCardsOfUser: fetchRandomCardsOfUser,
    };
}
