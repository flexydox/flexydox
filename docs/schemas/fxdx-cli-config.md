# Flexydox CLI configuration

## Properties

- **`outputFolder`** *(string)*: The folder to output the generated documentation to. Relative to the current working directory.

  Examples:
  ```yaml
  outputFolder: ./fxdx-docs
  ```

- **`base`** *(string)*: The base path to deploy to.

  Examples:
  ```yaml
  base: /my-path-prefix
  ```

- **`site`** *(string)*: Your final deployed URL.

  Examples:
  ```yaml
  site: https://api-docs.my-site.dev
  ```

- **`title`** *(string)*: The title of the documentation. it will appear in the header of the documentation.

  Examples:
  ```yaml
  title: My API Documentation
  ```

- **`logo`**: The logo to display in the header of the documentation. Refer to *[#/definitions/Logo](#definitions/Logo)*.
- **`apis`** *(array)*: The APIs to generate documentation for.
  - **Items**: Refer to *[#/definitions/API](#definitions/API)*.
- **`customPagesFolder`** *(string)*: The folder containing custom pages to include in the documentation. Relative to this configuration file.

  Examples:
  ```yaml
  customPagesFolder: ./custom-pages
  ```

- **`examplesFolder`** *(string)*: The folder containing example requests and responses to include in the documentation. Relative to this configuration file.

  Examples:
  ```yaml
  examplesFolder: ./examples
  ```

- **`groups`** *(array)*: The groups to use to categorize the APIs.
  - **Items**: Refer to *[#/definitions/Group](#definitions/Group)*.
## Definitions

- <a id="definitions/API"></a>**`API`** *(object)*: An API to generate documentation for. Cannot contain additional properties.
  - **`id`** *(string, required)*: A unique identifier for the API. This is used to generate unique URLs for the types and operations.

    Examples:
    ```yaml
    id: my-api-v1
    ```

  - **`name`** *(string, required)*: The name of the API as it should appear in the documentation.

    Examples:
    ```yaml
    name: My API
    ```

  - **`inferGroups`** *(boolean)*: Whether to infer groups from the API specification. Currently groups can be inferred  from OpenAPI 3.0 using the tags defined in the specification. Default: `true`.

    Examples:
    ```yaml
    inferGroups: false
    ```

  - **`url`** *(string, required)*: The URL of the API specification (OpenAPI 3.0 or GraphGL schema) to generate documentation for. It can be a local file path (absolute or relative to this configuration file) or a URL. For GraphQL schemas, the URL may point to the introspection query result or to the schema itself.

    Examples:
    ```yaml
    url: https://api.my-site.dev/openapi.json
    ```

    ```yaml
    url: ./openapi.json
    ```

    ```yaml
    url: /home/openapi.json
    ```

    ```yaml
    url: ./my-graphql-api.graphql
    ```

    ```yaml
    url: https://api.my-site.dev/my-graphql-api
    ```

    ```yaml
    url: https://api.my-site.dev/my-graphql-api.graphql
    ```

  - **`docUrl`** *(string)*: Optional url pointing to the documentation of the API. it will be displayed in the documentation.

    Examples:
    ```yaml
    url: https://api.my-site.dev/openapi.json
    ```

    ```yaml
    url: ./openapi.json
    ```

    ```yaml
    url: /home/openapi.json
    ```

    ```yaml
    url: ./my-graphql-api.graphql
    ```

    ```yaml
    url: https://api.my-site.dev/my-graphql-api
    ```

    ```yaml
    url: https://api.my-site.dev/my-graphql-api.graphql
    ```

- <a id="definitions/Group"></a>**`Group`** *(object)*: Cannot contain additional properties.
  - **`name`** *(string, required)*: The name of the group as it should appear in the documentation.

    Examples:
    ```yaml
    name: User
    ```

  - **`regex`** *(string, required)*: A regular expression to match the type or operation names. Matching types or operations will be assigned to this group.

    Examples:
    ```yaml
    regex: /user/i
    ```

- <a id="definitions/Logo"></a>**`Logo`** *(object)*: The logo to display in the header of the documentation. Cannot contain additional properties.
  - **`url`** *(string, required)*: The URL of the logo image. It can be a local file path (absolute or relative to this configuration file) or a URL.

    Examples:
    ```yaml
    url: https://api.my-site.dev/logo.png
    ```

    ```yaml
    url: ./logo.svg
    ```

    ```yaml
    url: /home/logo.png
    ```

  - **`width`** *(integer, required)*: The width of the logo image in pixels.

    Examples:
    ```yaml
    width: 100
    ```

  - **`height`** *(integer, required)*: The height of the logo image in pixels.

    Examples:
    ```yaml
    height: 50
    ```

  - **`alt`** *(string)*: The alt text for the logo image.

    Examples:
    ```yaml
    alt: My API Logo
    ```

