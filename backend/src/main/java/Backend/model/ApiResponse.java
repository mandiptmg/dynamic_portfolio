package Backend.model;

import lombok.Data;

@Data
public class ApiResponse<T> {
    private String status;
    private int code;
    private String message;
    private T data;
    private String timestamp;

    public ApiResponse(String status, int code, String message, T data, String timestamp) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.data = data;
        this.timestamp = timestamp;
    }

}
