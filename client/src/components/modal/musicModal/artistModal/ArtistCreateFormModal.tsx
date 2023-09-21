import styled from "styled-components";
import { useState, FC } from "react";
import { AlertMessageSuccess, LoaderForm } from "../../..";
import { useForm, Controller } from "react-hook-form";
import { useUserMusicContext } from "../../../../context/UserMusicContext";
import { useGenresContext } from "../../../../context";
import { MultiSelect } from "react-multi-select-component";
interface userFormModal {
  closeModal: () => void;
}

interface CreateArtistType {
  artistName: string;
  artistImage: string;
  popularity: number;
  albumId: string[];
  genreId: string[];
}

interface Option {
  label: string;
  value: string;
}

export const ArtistCreateForm: FC<userFormModal> = ({ closeModal }) => {
  const { createNewArtist, albums } = useUserMusicContext();
  const { allGenres } = useGenresContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm({
    defaultValues: {
      artistName: "",
      artistImage: "",
      popularity: 0,
      albumId: [],
      genreId: [],
    },
  });

  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;

  const popularityNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const onSubmit = async (newArtistData: CreateArtistType) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("artistName", newArtistData.artistName);
      formData.append("artistImage", newArtistData.artistImage[0]);
      formData.append("popularity", newArtistData.popularity.toString());

      if (Array.isArray(newArtistData.albumId)) {
        for (const album of newArtistData.albumId as unknown as Option[]) {
          formData.append("albumId", album.value);
        }
      }

      if (Array.isArray(newArtistData.genreId)) {
        for (const genre of newArtistData.genreId as unknown as Option[]) {
          formData.append("genreId", genre.value);
        }
      }
      await createNewArtist(formData);

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        closeModal();
      }, 4000);
    } catch (error) {
      console.error("Error saving artist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ArtistsFormContainer>
      {isLoading && <LoaderForm />}
      {isSuccess && <AlertMessageSuccess>artist create successfully</AlertMessageSuccess>}
      <header>Create Artist</header>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input_box">
          <label htmlFor="artistName">Name</label>
          <input
            {...register("artistName", {
              required: "Name is required",
            })}
            placeholder="Enter full Name"
            type="text"
            id="artistName"
          />
          {errors.artistName && <span className="error_input">{errors.artistName.message}</span>}
        </div>
        <div className="form__gender_box">
          <Controller
            name="genreId"
            control={control}
            render={({ field }) => (
              <MultiSelect 
                options={allGenres.map((genre) => ({ label: genre.genreName, value: genre.id }))}
                labelledBy="Select Genre"
                {...field}
                overrideStrings={{
                  selectSomeItems: "Select Genre",
                }}
              />
            )}
          />
          {errors.genreId && <span className="error_input">At least one genre is required</span>}
          <Controller
            name="albumId"
            control={control}
            render={({ field }) => (
              <MultiSelect
                options={albums.map((album) => ({ label: album.albumName, value: album.id }))}
                labelledBy="Select Album"
                {...field}
                overrideStrings={{
                  selectSomeItems: "Select Album",
                }}
              />
            )}
          />
          {errors.albumId && <span className="error_input">At least one album is required</span>}
                <div className="input_box">
            <label htmlFor="popularity" className="">Select popularity</label>
          <select className="select" {...register("popularity")} id="popularity" >
            <option value="">Select Popularity</option>
            {popularityNumbers.map((popularity) => (
              <option key={popularity} value={popularity}>
                {popularity}
              </option>
            ))}
          </select>

                </div>
          {errors.popularity && <span className="error_input">select popularity</span>}
        </div>
        <div className="input_box description">
          <label className="label_file" htmlFor="image">
            Choose a file:
          </label>
          <input
            className="inpdut"
            id="image"
            type="file"
            accept="image/*"
            {...register("artistImage", {
              required: "Please choose a file",
            })}
          />
        </div>
        <ButtonAdd>
          <span className="shadow"></span>
          <span className="front">
            <strong className='font-size'>ADD Artist</strong>
          </span>
        </ButtonAdd>
      </form>
    </ArtistsFormContainer>
  );
};

const ArtistsFormContainer = styled.section`
  max-width: 500px;
  width: 100%;
  background: linear-gradient(to right, hsl(300, 100%, 10%), #000);
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);

  header {
    font-size: 1.5rem;
    color: #f5f4e8;
    font-weight: 600;
    text-align: center;
  }

  .form {
    margin-top: 15px;
  }
  .form .input_box {
    width: 100%;
    padding-top: 0.1rem;
  }

  .input_box label {
    color: #f5f4e8;
    font-size: 1.2rem;
    font-weight: 700;
    padding-top: 0.3rem;
  }

  .form :where(.input_box input) {
    position: relative;
    height: 35px;
    width: 100%;
    outline: none;
    font-size: 1rem;
    color: #2b1c1c;
    margin-top: 5px;
    border: 1px solid #ee4e34;
    border-radius: 6px;
    padding: 0 15px;
    background: #fcedda;
  }

  .input_box input:focus {
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  }

  .form .column {
    display: flex;
    column-gap: 15px;
  }

.form__gender_box {
  color: #f5f4e8;
}

  .form :where(.gender_option, .gender) {
    display: flex;
    align-items: center;
    column-gap: 50px;
    flex-wrap: wrap;
    margin-top: 0.3rem;
  }

  .description {
    margin-top: 0.5rem;
  }

  .error_input {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: bold;
    width: 14rem;
    padding: 0.5rem 0 0 0;
    display: flex;
    align-items: center;
    color: #ef665b;
  }

  .form .gender {
    column-gap: 5px;
  }

  .gender input {
    accent-color: #ee4e34;
  }

.form :where(.gender input, .gender label) {
  cursor: pointer;
}

  .select {
    width: 100%;
    padding: 1.2rem 0;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-weight: 700;
    font-size: 1.3rem;
    color: hsl(0, 100%, 0.9803921568627451%);
    background-color: rgb(134, 129, 134);
    cursor: pointer;
    & option {
      cursor: pointer;
    }
  }

  .form_button-Submit {
    padding: 1.2rem 0;
    width: 100%;
    color: #000;
    font-size: 1.3rem;
    font-weight: 700;
    margin-top: 15px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: #ee4e34;
  }

  .form_button-Submit:hover {
    background: #ee3e34;
    color: #f5f4e8;
  }

  .label_file {
    padding-top: 0.5rem;
    font-weight: bold;
    display: block;
    cursor: pointer;
  }

.form__gender_box {

}

.inpdut[type="file"] {
  padding: 10px;
  margin-bottom: 1rem;
  border: none;
  background-color:  rgb(134, 129, 134);
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
}

  .rmsc {
    --rmsc-main: #4285f4;
    --rmsc-hover: #dbe1e7;
    --rmsc-selected: #275f01c8;
    --rmsc-border: #ccc;
    --rmsc-gray: #000000;
    --rmsc-bg: rgb(134, 129, 134);
    --rmsc-p: 0.5rem; /* Spacing */
    --rmsc-radius: 4px; /* Radius */
    --rmsc-h: 38px; /* Height */
  }

  .rmsc .dropdown-heading {
    padding: var(--rmsc-p);
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--rmsc-h);
    cursor: pointer;
    outline: 0;
  }
  .rmsc .dropdown-heading .dropdown-heading-value {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    width: 100%;
    color: hsl(0, 0%, 100%);
    font-weight: 700;
    font-size: 1.3rem;
  }

  .rmsc .dropdown-container {
    z-index: 1;
    outline: 0;
    margin: 1rem 0;
    background-color: var(--rmsc-bg);
    border: 1px solid var(--rmsc-border);
    border-radius: var(--rmsc-radius);
  }
  .rmsc .dropdown-content {
    color: hsl(0, 100%, 0.7843137254901961%);
    font-size: 1.2rem;
    font-weight: 600;
    position: relative;
    border: 1px solid var(--rmsc-border);
    border-radius: var(--rmsc-radius);
  }

`;
const ButtonAdd = styled.button`
background: var( --background-button-shade-color);
width: 100%;
  border-radius: 12px;
  border: none;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  font-size:4rem;
  padding-top: 0.5rem;
.edge {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
   background: linear-gradient(
    to left,
    hsl(340deg 100% 16%) 0%,
    hsl(340deg 100% 32%) 8%,
    hsl(340deg 100% 32%) 92%,
    hsl(340deg 100% 16%) 100%
  );
}
.front {
  display: block;
  position: relative;
  padding: 8px 25px;
  border-radius: 12px;
  font-size: 1.5rem;
  color: #fafafa;
  background:var(--background-button-color);
  will-change: transform;
  transform: translateY(-4px);
  transition:
    transform
    600ms
    cubic-bezier(.3, .7, .4, 1);
}
&:hover {
  filter: brightness(110%);

}
&:hover .front {
  transform: translateY(-6px);
  transition:
    transform
    250ms
    cubic-bezier(.3, .7, .4, 1.5);
}
&:active .front {
  transform: translateY(-2px);
  transition: transform 34ms;
}
`