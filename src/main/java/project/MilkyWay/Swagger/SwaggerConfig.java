package project.MilkyWay.Swagger;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
public class SwaggerConfig
{
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("Mikyway")
                .select()
                .apis(RequestHandlerSelectors.basePackage("project.MilkyWay.Controller"))
                .paths(PathSelectors.ant("/api/**"))
                .build()
                .apiInfo(this.apiInfo());
    }

    private ApiInfo apiInfo()
    {
        return new ApiInfoBuilder()
                .title("MikyWay Project With Swagger")
                .description("밀키웨이 프로젝트의 API 생성")
                .version("1.0")
                .build();

    }
}
