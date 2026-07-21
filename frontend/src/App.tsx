import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { addNotes, fetchNotes, removeNotes, updateNotes } from "./services/api.service";
import type { Note } from "./types/types";

const formatDisplayDate = (timestamp: string) => {
  return new Date(timestamp).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });
};

const App = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const canSave = title.trim().length > 0 && body.trim().length > 0;

  async function loadNotes() {
    const notes = await fetchNotes();
    setNotes(notes);
  } 

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSave) return;

    //post api
    await addNotes(title, body);
    await loadNotes();

    setTitle("");
    setBody("");
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadNotes();
  }, []);

  return (
    <main className="min-h-screen bg-[#0b1120] text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-8 sm:px-8 lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,0.65fr)] lg:py-10">
        <section className="rounded-lg border border-white/10 bg-slate-900 p-5 shadow-2xl shadow-black/20 sm:p-7">
          <div className="mb-6 flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-emerald-300">
              QuickNotes
            </p>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Make a note
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Add a clear title, write the note body, then choose when this note
              belongs.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-200">
                Title
              </span>
              <input
                className="h-12 w-full rounded-md border border-white/10 bg-slate-950 px-4 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/15"
                placeholder="Example: MongoDB timestamp fix"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-200">
                Body
              </span>
              <textarea
                className="min-h-44 w-full resize-y rounded-md border border-white/10 bg-slate-950 px-4 py-3 text-base leading-7 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/15"
                placeholder="Write the details here..."
                value={body}
                onChange={(event) => setBody(event.target.value)}
              />
            </label>

            {/* <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-200">Date</span>
                <input
                  className="h-12 w-full rounded-md border border-white/10 bg-slate-950 px-4 text-base text-white outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/15"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-200">Time</span>
                <input
                  className="h-12 w-full rounded-md border border-white/10 bg-slate-950 px-4 text-base text-white outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/15"
                  type="time"
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                />
              </label>
            </div> */}

            <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
              {/* <p className="text-sm text-slate-400">
                Preview: {formatDisplayDate(date, time)}
              </p> */}
              <button
                className="h-12 rounded-md bg-emerald-500 px-6 text-sm font-bold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
                type="submit"
                disabled={!canSave}
              >
                Save note
              </button>
            </div>
          </form>
        </section>

        <aside className="rounded-lg border border-white/10 bg-[#101827] p-5 shadow-2xl shadow-black/20 sm:p-6">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-emerald-300">
                Saved
              </p>
              <h2 className="mt-1 text-2xl font-bold text-white">Your notes</h2>
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white">
              {notes.length}
            </span>
          </div>

          <div className="space-y-4">
            {notes.length === 0 ? (
              <div className="rounded-lg border border-dashed border-white/15 bg-white/5 p-5">
                <p className="text-sm leading-6 text-slate-300">
                  Notes you save will appear here with their title, body, date,
                  and time.
                </p>
              </div>
            ) : (
              notes.map((note) => (
                <article
                  className="rounded-lg border border-white/10 bg-slate-900 p-4 text-slate-100 shadow-sm"
                  key={note.id}
                >
                  <div className="flex justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-300">
                      {formatDisplayDate(note.timestamp)}
                    </p>
                    <div className="flex gap-3">
                      {/* edit button */}
                      <div 
                        className="p-2 hover:bg-slate-300 hover:text-slate-950 hover:rounded-2xl"
                        onClick={async (e)=>{
                          e.stopPropagation();
                          const new_title = window.prompt('Enter title');
                          const new_body = window.prompt('Enter body');
                          if(!new_title || !new_body) return;

                          await updateNotes(new_title, new_body, note._id);
                          await loadNotes();
                          
                        }}
                      >
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="currentColor"
                        >
                          <path
                            d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </div>

                      <div 
                        className="p-2 hover:bg-red-400 hover:text-slate-950 hover:rounded-2xl"
                        onClick={async (e)=>{
                          e.stopPropagation();
                          const confirm = window.confirm('Are you sure you want to remove this note?');
                          if(confirm){
                            await removeNotes(note._id);
                            await loadNotes();
                          }
                        }}  
                      >
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="currentColor"
                        >
                          <path
                            d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </div>
                      {/* delete button */}
                    </div>
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-white">
                    {note.title}
                  </h3>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                    {note.body}
                  </p>
                </article>
              ))
            )}
          </div>
        </aside>
      </div>
    </main>
  );
};

export default App;
