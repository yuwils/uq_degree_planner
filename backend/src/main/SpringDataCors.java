@Component
public class SpringDataRestCustomization extends RepositoryRestConfigurer {

 @Override
 public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
    config.getCorsRegistry().addMapping("/**").allowedOrigins("*");
  }
}