// custom "optional" function for yup validation
import * as yup from "yup";

// Only add our `optional` method to object types
yup.addMethod(yup.object, "optional", function(
  isOptional = true,
  defaultValue = undefined
) {
  return (
    this.transform(function(value) {
      // If false is passed, skip the transform
      if (!isOptional) return value;

      // If any child property has a value, skip the transform
      if (
        value &&
        Object.values(value).some(
          v => !(v === null || v === undefined || v === "")
        )
      ) {
        return value;
      }

      return defaultValue;
    })
      // Override `Yup.object` default
      .default(defaultValue)
  );
});
