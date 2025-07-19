# frozen_string_literal: true

module Jekyll
  module LoggerHelper
    # Logs warning message.
    def warn(topic = default_log_topic, message)
      Jekyll.logger.warn(topic, message)
    end

    # Logs info message.
    def info(topic = default_log_topic, message)
      Jekyll.logger.info(topic, message)
    end

    # Logs error message.
    def error(topic = default_log_topic, message)
      Jekyll.logger.error(topic, message)
    end

    private

    # Default topic fallback
    def default_log_topic
      (self.class.name || "JekyllPlugin") + ":"
    end
  end
end
