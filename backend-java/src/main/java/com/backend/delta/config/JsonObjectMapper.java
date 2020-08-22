package com.backend.delta.config;


import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.deser.std.StringDeserializer;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.std.DateSerializer;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JsonObjectMapper extends ObjectMapper {

    private final SimpleModule simpleModule;

    public JsonObjectMapper() {

        this.simpleModule = new SimpleModule();

        setDeserializers();
        setSerializers();

        this.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        this.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        this.registerModule(this.simpleModule);
        this.registerModule(new Jdk8Module());

    }

    private void setDeserializers() {
        this.simpleModule.addDeserializer(String.class, new StringDeserializer());

    }

    private void setSerializers() {

        this.simpleModule.addSerializer(Date.class, new DateSerializer());

    }
}
