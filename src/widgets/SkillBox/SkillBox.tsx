import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Title, Group, ActionIcon, TextInput, Pill } from "@mantine/core";

import {
  useTypedDispatch,
  useTypedSelector,
} from "../../app/redux/hooks/redux";
import { addSkill, removeSkill } from "../../app/redux/reducers/vacanciesSlice";
import AddIcon from "../../app/assets/main/add-icon.svg";

import styles from "./SkillBox.module.css";

export const SkillBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useTypedDispatch();

  const [skillInput, setSkillInput] = useState("");

  const skills = useTypedSelector((state) => state.vacanciesReducer.skill_set);

  const addSkillPill = useCallback(() => {
    dispatch(addSkill(skillInput.trim()));
    setSkillInput("");
    searchParams.set("page", String(1));
  }, [dispatch, searchParams, skillInput]);

  useEffect(() => {
    setSearchParams((searchParams) => {
      if (!skills.length) {
        searchParams.delete("skills");
      } else {
        const skillSet = `${skills.join(" AND ")}`;
        searchParams.set("skills", skillSet);
      }
      return searchParams;
    });

    const onEnter = (evt: { code: string }) => {
      if (!skillInput) {
        return;
      }

      if (evt.code === "Enter" || evt.code === "NumpadEnter") {
        addSkillPill();
      }
    };

    document.addEventListener("keydown", onEnter);
    return () => document.removeEventListener("keydown", onEnter);
  }, [addSkillPill, setSearchParams, skillInput, skills]);

  const handleClickOnAddSkill = () => {
    if (!skillInput) {
      return;
    }
    addSkillPill();
  };

  const handleClickOnRemoveSkill = (item: string) => {
    dispatch(removeSkill(item));
    searchParams.set("page", String(1));
  };

  const skillPills = skills.map((pill) => (
    <Pill
      key={pill}
      withRemoveButton
      onRemove={() => handleClickOnRemoveSkill(pill)}
    >
      {pill}
    </Pill>
  ));

  return (
    <div className={styles["skillbox__container"]}>
      <Title className={styles["skillbox__title"]}>Ключевые навыки</Title>
      <Group className={styles["skillbox__input-bar"]}>
        <TextInput
          placeholder="Навык"
          size="sm"
          radius={8}
          value={skillInput}
          onChange={(evt) => setSkillInput(evt.currentTarget.value)}
          className={styles["skillbox__input"]}
        />
        <ActionIcon
          size="input-sm"
          variant="default"
          radius={8}
          aria-label="ActionIcon the same size as inputs"
          onClick={handleClickOnAddSkill}
          className={styles["skillbox__add-skill-btn"]}
        >
          <img
            src={AddIcon}
            alt="add-icon"
            className={styles["skillbox__add-skill-icon"]}
          />
        </ActionIcon>
      </Group>
      <Pill.Group className={styles["skillbox__skill-set"]}>
        {skillPills}
      </Pill.Group>
    </div>
  );
};
