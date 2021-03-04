import React from "react";

export function CustomFileField({ record }) {
  if (record.name) return record.name;
  if (record.rawFile) return record.rawFile.name;
  return <></>;
}
