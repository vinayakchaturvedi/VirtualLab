package com.example.virtuallab.utils;

import com.example.virtuallab.bean.Execution;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.util.Scanner;

public class FileOperation {

    private static final Logger LOGGER = LoggerFactory.getLogger(FileOperation.class);

    public String readFile(String fileName) {
        StringBuilder response = new StringBuilder("");
        try {
            File myObj = new File(fileName);
            Scanner myReader = new Scanner(myObj);
            while (myReader.hasNextLine()) {
                response.append(myReader.nextLine());
            }
            myReader.close();
            return response.toString();
        } catch (FileNotFoundException e) {
            LOGGER.error(e.getLocalizedMessage());
            return "";
        }
    }

    public Execution readJsonFile(String fileName, Execution execution) {
        JSONParser jsonParser = new JSONParser();

        try (FileReader reader = new FileReader(fileName)) {
            //Read JSON file
            Object obj = jsonParser.parse(reader);

            JSONObject object = (JSONObject) obj;
            String error = (String) object.get("stderr");
            String output = (String) object.get("stdout");
            if (error.isEmpty()) {
                execution.setResult(output);
                execution.setSuccessfulExecution(true);
                return execution;
            }
            execution.setResult(error);
            execution.setSuccessfulExecution(false);
            return execution;
        } catch (FileNotFoundException e) {
            LOGGER.error(e.getLocalizedMessage());
        } catch (IOException e) {
            LOGGER.error(e.getLocalizedMessage());
        } catch (ParseException e) {
            LOGGER.error(e.getLocalizedMessage());
        }
        execution.setResult("Error");
        execution.setSuccessfulExecution(false);
        return execution;
    }

    public void writeToFile(String fileName, String content) {
        try {
            FileWriter myWriter = new FileWriter(fileName);
            myWriter.write(content);
            myWriter.close();
        } catch (IOException e) {
            LOGGER.error(e.getLocalizedMessage());
        }
    }

    public void deleteFile(String fileName) {
        File myObj = new File(fileName);
        if (!myObj.delete()) {
            LOGGER.error("Failed to delete the file: " + fileName);

        }
    }
}
