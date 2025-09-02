// src/mocks/handlers.ts
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/exercises/:routineId", ({ params }) => {
    // http.get에서는 req.params 사용 가능
    // const { routineId } = req.params;

    return HttpResponse.json(
      [
        {
          id: 1,
          name: "스쿼트",
          restSeconds: 60,
          sets: [
            { id: 1, weight: 120, reps: 12 },
            { id: 2, weight: 120, reps: 12 },
            { id: 3, weight: 120, reps: 12 },
          ],
        },
        {
          id: 2,
          name: "벤치프레스",
          restSeconds: 90,
          sets: [
            { id: 1, weight: 80, reps: 10 },
            { id: 2, weight: 80, reps: 10 },
          ],
        },
        {
          id: 3,
          name: "데드리프트",
          restSeconds: 120,
          sets: [
            { id: 1, weight: 120, reps: 12 },
            { id: 2, weight: 120, reps: 12 },
            { id: 3, weight: 120, reps: 12 },
          ],
        },
        {
          id: 4,
          name: "플라이",
          restSeconds: 50,
          sets: [
            { id: 1, weight: 120, reps: 12 },
            { id: 2, weight: 120, reps: 12 },
            { id: 3, weight: 120, reps: 12 },
            { id: 4, weight: 120, reps: 12 },
            { id: 5, weight: 120, reps: 12 },
          ],
        },
        {
          id: 5,
          name: "레그 익스텐션",
          restSeconds: 40,
          sets: [
            { id: 1, weight: 120, reps: 12 },
            { id: 2, weight: 120, reps: 12 },
            { id: 3, weight: 120, reps: 12 },
          ],
        },
      ]
      // {
      //   headers: {
      //     "content-type": "application/hal+json",
      //   },
      // }
    );
  }),
];
