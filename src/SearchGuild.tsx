import { TextField, Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchGuildNames } from "./api";

type SearchGuildProps = {
  guild?: string;
};

const SearchGuild = ({ guild }: SearchGuildProps) => {
  const [options, setOptions] = useState<Array<String>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGuildNames()
      .then(setOptions);
  }, []);

  return (
    <Autocomplete
      options={options}
      defaultValue={guild}
      onChange={(_evt, value) => value && navigate(`/guild/${value}`)}
      style={{ width: 400 }}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label="Guild" />
      )}
    />
  );
};

export default SearchGuild;